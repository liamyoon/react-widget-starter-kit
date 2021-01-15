
## 설치 및 빌드
```bash
# starter kit 클론
git clone https://github.com/jupyterlab/https://github.com/liamyoon/react-widget-starter-kit
cd react-widget-starter-kit

# 빌드 및 extension 인스톨
jlpm
jlpm build
jupyter labextension install .

# 변경 후 소스 재빌드
jlpm build
# 변경 후 jupyterlab 재빌드
jupyter lab build
```

## widget 개발 시 watch 모드를 이용
```bash
# 개별탭에서 소스 감시
jlpm watch
# 개별탭에서 watch 모드로 jupyterlab 실행
jupyter lab --watch
```
