// TOC component

"use client";

import React, { useState } from "react";
import Typewriter from "typewriter-effect";

interface Props {
  content: string;
}

const Toc = ({ content }: Props) => {
  // activeId는 화면 상단에 위치한 제목 element 다룰 state
  const [activeId, setActiveId] = useState("");
  console.log(activeId);

  // intersectionObserver를 이용해 만든 커스텀 훅으로 setState를 전달 하여
  // 화면 상단에 위치한 제목 element가 뭔지 알아낸다.
  useIntersectionObserver(setActiveId, content);

  // 게시물 본문을 줄바꿈 기준으로 나누고, 제목 요소인 것만 저장
  const titles = content.split(`\n`).filter((t) => t.includes("# "));

  // 예외처리 - 제목은 문자열 시작부터 #을 써야함
  const result = titles
    .filter((str) => str[0] === "#")
    .map((item) => {
      // #의 갯수에 따라 제목의 크기가 달라지므로 갯수를 센다.
      let count = item.match(/#/g)?.length;
      if (count) {
        // 갯수에 따라 목차에 그릴때 들여쓰기 하기위해 *10을 함.
        count = count * 10;
      }

      // 제목의 내용물만 꺼내기 위해 '# '을 기준으로 나누고, 백틱과 공백을 없애주고 count와 묶어서 리턴
      return { title: item.split("# ")[1].replace(/`/g, "").trim(), count };
    });

  return (
    <div className="w-full">
      <div style={{ height: "100%" }}>
        <p className="border-b mb-4 text-gray-500">목차</p>
        <div />
        {/* 목차에 item이 너무 많은경우 화면 아래로 넘어갈수 있기때문에 ScrollBars를 이용하여
        스크롤을 만들어준다. */}
        <div>
          {result.map((item, idx) => {
            // count는 샾개수에 따른 들여쓰기용 변수
            if (item?.count && item.count <= 30 && item?.title) {
              return (
                <a
                  // href에 #title을 주어서 클릭시 해당 위치로 스크롤 이동하도록 구현
                  href={`#${item.title.replace(/ /g, "-")}`}
                  key={item.title + idx}
                  style={{ padding: "0px" }}
                  className={`${
                    activeId === item.title.replace(/ /g, "-")
                      ? "text-blue-500 border-l-4 border-blue-500 bg-slate-100"
                      : "text-gray-500"
                  } transition-all block`}
                >
                  <div
                    // 목차에 해당 하는 title을 넣는다.
                    style={{
                      marginLeft: `${item.count}px`,
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </div>
                </a>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Toc;

// useIntersectionObserver custom hook
import { useEffect, useRef } from "react";
import TypoWrite from "./TypoWrite";

export const useIntersectionObserver = (
  // 넘겨받은 setActiveId 를 통해 화면 상단의 제목 element를 set해준다.
  setActiveId: React.Dispatch<React.SetStateAction<string>>,
  // 게시글 내용이 바뀔때를 알기 위해 content를 넘겨받는다.
  content: string
) => {
  // heading element를 담아서 사용하기 위한 ref
  const headingElementsRef = useRef<any>({});

  useEffect(() => {
    // 새로고침 없이 다른 게시물로 이동할 경우를 대비한 초기화
    headingElementsRef.current = {};

    // callback은 intersectionObserver로 관찰할 대상 비교 로직
    const callback: IntersectionObserverCallback = (headings) => {
      // 모든 제목을 reduce로 순회해서 headingElementsRef.current에 키 밸류 형태로 할당.
      headingElementsRef.current = headings.reduce(
        (map: any, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        },
        headingElementsRef.current
      );

      // 화면 상단에 보이고 있는 제목을 찾아내기 위한 로직
      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];

        // isIntersecting이 true라면 visibleHeadings에 push한다.
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      // observer가 관찰하는 영역에 여러개의 제목이 있을때 가장 상단의 제목을 알아내기 위한 함수
      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        // 화면에 보이고 있는 제목이 1개라면 해당 element의 target.id를 setActiveId로 set해준다.
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        // 2개 이상이라면 sort로 더 상단에 있는 제목을 set해준다.
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    // IntersectionObserver에 callback과 옵션을 생성자로 넘겨 주고 새로 생성한다.
    const observer = new IntersectionObserver(callback, {
      // rootMargin 옵션을 통해 화면 상단에서 네비바 영역(-64px)을 빼고, 위에서부터 -40%정도 영역만 관찰한다.
      rootMargin: "-64px 0px -40% 0px",
    });

    // 제목 태그들을 다 찾아낸다.
    const headingElements = Array.from(document.querySelectorAll("h1, h2, h3"));

    // 이 요소들을 observer로 관찰한다.
    headingElements.forEach((element) => observer.observe(element));

    // 컴포넌트 언마운트시 observer의 관찰을 멈춘다.
    return () => observer.disconnect();

    // content 내용이 바뀔때를 대비하여 deps로 content를 넣어준다.
  }, [content]);
};
