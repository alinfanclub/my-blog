
// src/redux/provider.tsx
"use client";

import store from "./store";
import { Provider } from "react-redux";

export default function ReduxProvider({ children}: {children: React.ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}


// // src/redux/provider.tsx
// "use client";

// import { PersistGate } from "redux-persist/integration/react";
// import store from "./store";
// import { Provider } from "react-redux";
// import persistStore from "redux-persist/es/persistStore";

// export default function ReduxProvider({ children}: {children: React.ReactNode}) {
//   const persister = persistStore(store);
//   return <Provider store={store}>
//     <PersistGate loading={null} persistor={persister}>{children}</PersistGate>
//   </Provider>;
// }