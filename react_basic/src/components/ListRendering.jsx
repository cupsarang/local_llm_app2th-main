// rfc 혹은 rfce 해서 Enter 를 사용하면 구조를 만들어 준다... Extension 에서 React 를 설치한 이후
import React from 'react'

const messages = [
    { id: 1, role: "user", content: "안녕하세요." },
    { id: 2, role: "assistant", content: "무엇을 도와드릴까요?" },
    { id: 3, role: "user", content: "Local LLM에 대해 알려줘." }
]

function ListRendering() {
    return (
        <main>
            <h1>메시지 목록</h1>
            {messages}
            <div>ListRendering</div>
        </main>
    )
}

export default ListRendering;
