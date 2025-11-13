# AI Code Review Workflow 설정 가이드

이 저장소에는 PR이 생성되거나 업데이트될 때 자동으로 Claude AI가 코드 리뷰를 수행하는 GitHub Actions workflow가 설정되어 있습니다.

## 🚀 설정 방법

### 1. Anthropic API Key 설정

AI 코드 리뷰 기능을 사용하려면 Anthropic API 키가 필요합니다.

1. [Anthropic Console](https://console.anthropic.com/)에서 API 키를 생성합니다.
2. GitHub 저장소의 **Settings** > **Secrets and variables** > **Actions**로 이동합니다.
3. **New repository secret** 버튼을 클릭합니다.
4. Secret 이름: `ANTHROPIC_API_KEY`
5. Value에 생성한 API 키를 입력합니다.
6. **Add secret** 버튼을 클릭하여 저장합니다.

### 2. Workflow 파일 확인

`.github/workflows/ai-code-review.yml` 파일이 저장소에 있는지 확인합니다.

## 📋 작동 방식

1. **트리거**: PR이 opened, synchronize, 또는 reopened될 때 자동 실행
2. **분석**: PR의 변경사항(diff)을 수집
3. **리뷰**: Claude AI가 코드를 분석하여 리뷰 제공
4. **코멘트**: PR에 리뷰 결과를 자동으로 코멘트로 작성

## 🔍 리뷰 내용

Claude AI는 다음 항목을 검토합니다:

- **Summary**: 변경사항 요약
- **Potential Issues**: 버그, 보안 이슈, 문제가 될 수 있는 패턴
- **Best Practices**: 코드 품질 개선 제안
- **Positive Aspects**: 잘 작성된 부분

## ⚙️ 제한사항

- 한 번에 최대 20개 파일까지 리뷰
- 다음 파일 타입은 자동으로 제외됩니다:
  - package-lock.json, yarn.lock
  - *.min.js, *.map
  - 이미지 파일 (png, jpg, jpeg, gif, svg, ico)

## 🧪 테스트 방법

1. 새로운 브랜치를 생성합니다.
2. 코드를 수정하고 커밋합니다.
3. GitHub에 푸시합니다.
4. PR을 생성합니다.
5. GitHub Actions 탭에서 workflow 실행을 확인합니다.
6. PR에 AI 리뷰 코멘트가 자동으로 작성되는지 확인합니다.

## 📝 참고사항

- API 키가 설정되지 않은 경우, workflow는 실행되지만 리뷰 코멘트는 작성되지 않습니다.
- Claude API 사용량에 따라 비용이 발생할 수 있습니다.
- 리뷰 결과는 참고용이며, 최종 결정은 사람이 검토해야 합니다.

## 🔧 문제 해결

### Workflow가 실행되지 않는 경우
- GitHub Actions가 저장소에서 활성화되어 있는지 확인
- Workflow 파일의 권한 설정 확인

### API 에러가 발생하는 경우
- ANTHROPIC_API_KEY가 올바르게 설정되었는지 확인
- API 키의 사용 한도를 확인
- Actions 실행 로그에서 자세한 에러 메시지 확인

## 💡 커스터마이징

Workflow를 수정하려면 `.github/workflows/ai-code-review.yml` 파일을 편집하세요:

- 리뷰할 최대 파일 수 조정: `maxFiles` 변수
- 제외할 파일 패턴 추가: `excludePatterns` 배열
- Claude 모델 변경: `model` 파라미터
- 프롬프트 커스터마이징: API 호출의 `content` 부분
