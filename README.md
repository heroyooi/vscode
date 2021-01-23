# VSCODE REPOSITORY

## VSCode Settings

### 설정 변경

1. Ctrl + , : Settings 탭 열기
2. Edit in settings.json > 다음 내용 추가

```json
{
    "editor.tabSize": 2
}
```

### 설정 초기화

※ 완전하게 초기 상태로 원복된다.

1. C:\Users\유저명\.vscode - 폴더 삭제
2. C:\Users\유저명\AppData\Roaming\code - 폴더 삭제
3. 제어판 - 프로그램 추가/제거 - visual studio code 삭제
4. vs code 재설치

## VSCode Extensions

- indent-rainbow
- Auto Close Tag
- Auto Rename Tag
- Auto Complete Tag
- Color Highlight
- Live Server
- SFTP
- Live Sass Compiler
- GitLens
- Git History
- Vetur

- Reactjs code snippets
- JS JSX Snippets
- Auto Import

## VSCode Keyboard Shortcuts

- Ctrl + D : 단어 선택
- Shift + Alt + Down : 한줄 복사
- Ctrl + B : 좌측판넬 토글
- Alt + Z : Word wrap 토글

- Ctrl + Shift + F : 프로젝트에서 검색
- Ctrl + Shift + H : 프로젝트에서 검색 및 바꾸기
- Ctrl + Shift + P : 모든 단축키 표시
- Ctrl + P : 파일명으로 빠른 열기

- Alt + L + O : 라이브서버 열기
- Alt + L + C : 라이브서버 닫기
- Alt + Shift + F : 코드 정리 (내 tabSize에 맞춰서 자동 정리)

- Ctrl + K + F (영역 드래그 한 상태에서) : 한줄 코드를 정리해줌

## Using Extensions

### emmet - jsx 지원

1. Ctrl + , : Settings 탭 열기
2. Edit in settings.json > 다음 내용 추가

```Json
{
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    }
}
```

### emmet - vue 지원

```Json
{
    "emmet.triggerExpansionOnTab": true,
    "emmet.includeLanguages": {
        "vue-html": "html",
        "vue": "html"
    }
}
```

### 파일검색 제외항목 추가
```Json
{
  "files.exclude": {
    "**/build/": true
  },
  "search.exclude": {
    "**/node_modules": true,
  }
}
```

### eslint 관련 - 저장할  eslint 에러 수정
```Json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

### SFTP

1. VSCode 확장기능 : SFTP 설치
2. Ctrl + Shift + P
3. >SFTP: Config
4. sftp.json 파일이 생성되면 다음과 같이 세팅한다.
```json
{
    "name": "MyServer",
    "host": "heroyooi.ivyro.net",
    "protocol": "ftp",
    "port": 21,
    "username": "heroyooi",
    "password": "**********",
    "remotePath": "/public_html",
    "uploadOnSave": true
}
```

### Live Sass Compiler

1. VSCode 확장기능 : Live Sass Compiler 설치
2. Ctrl + , : Settings 탭 열기
3. Extenstions > Edit in settings.json > 다음 내용 추가
```json
{
    "liveSassCompile.settings.excludeList": [
        "**/node_modules/**",
        ".vscode/**",
    ],
    "liveSassCompile.settings.formats": [
        {
            "format": "compressed", // 컴파일링 포맷(nested, expanded, compact, compressed)
            "extensionName": ".css", // default
            "savePath": "~/../css" // 컴파일링 경로(scss, css폴더가 같을 경우 동일하게 설정 / ~: 현재 폴더)
        }
    ],
    "liveSassCompile.settings.generateMap": true, // 컴파일링시 .map 파일을 생성한다. (크롬 sass 디버깅을 위해 필요)
}
```
4. 하단에 Watch Sass 클릭하면 자동으로 Sass 컴파일링 시작

### prettier 적용
```json
{ 
  "editor.formatOnSave": true
}
```

### GIT

1. VSCode 확장기능 : GitLens, Git History 설치
2. Ctrl + Shift + P
3. >Git: Clone
4. 저장소 주소 입력
5. 저장소 소스가 복제될 폴더 선택

### Simple React Snippets

```JavaScript
import React from 'react'; // imr
```

```JavaScript
import React, { Component } from 'react'; // imrc
```

```JavaScript
class  extends Component { // cc
  state = {  }
  render() { 
    return (  );
  }
}
 
export default ;
```

```JavaScript
const  = () => { // sfc
  return (  );
}
 
export default ;
```

### Contributor

- heroyooi
- wildjy

## Node 관련 명령어

※ node_modules 폴더 삭제

```command
npm i -g rimraf
rimraf node_modules
```
