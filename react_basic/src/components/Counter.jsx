import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        // return 안에는 비어있는 tag 라도 들이가야 한다. <> </> 혹은 다른 HTML 
        < div >
            <h1>카운터 예제</h1>
            <p>현재값 : {count}</p>
            <button onClick={() => setCount(count - 1)}>감소</button>
            <button onClick={() => setCount(count + 1)}>증가</button>
        </div >
    );
}

export default Counter;