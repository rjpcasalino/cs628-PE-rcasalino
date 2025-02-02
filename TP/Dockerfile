# docker run --rm  -v ./my-next-app:/root/my-next-app -p [hostPort]:3000 [name]
FROM rockylinux:9-minimal

RUN <<EOF
microdnf install -y findutils tar vim
touch /root/.bashrc; 
curl -o installnodejs.sh https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh;
bash ./installnodejs.sh;
source /root/.bashrc;
nvm install 22;
mkdir -p /root/my-next-app && cd /root/my-next-app;
npm install next@latest react@latest react-dom@latest;
EOF

ENV PATH="$PATH:/root/.nvm/versions/node/v22.13.0/bin/"
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

COPY ./my-next-app /root/my-next-app
WORKDIR /root/my-next-app
EXPOSE 3000

CMD [ "node", "/root/my-next-app/node_modules/next/dist/bin/next", "dev" ]
