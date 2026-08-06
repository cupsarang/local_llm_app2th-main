# 실습 : image to text
from ollama import chat

IMAGE_PATH = "imgs/img01.jpg"
MODEL_NAME = "exaone3.5:7.8b"

try:
    response = chat(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": """
이 이미지를 한국어로 설명해줘.

다음 형식으로 답변해줘.
1. 전체 장면
2. 주요 객체
3. 배경
4. 이미지에서 추론 가능한 상황
""",
                "images": [IMAGE_PATH],
            }
        ],
        think=False,
        stream=False,
    )
    print(response.message.content)
except Exception as exc:
    print(f"이미지 모델 호출 중 오류 발생: {exc}")
    print("Ollama 서비스가 실행 중인지, 모델 이름이 올바른지 확인하세요.")