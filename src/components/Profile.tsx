

export default function Profile(ctx: any) {
  let req = ctx.req;
  let data = req.cookies.token;
  console.log(data)
  return (
    <>
     1
    </>
  );
}

