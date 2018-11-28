To configure:

- Copy or genertate your private and public keys for git to `.ssh/id_rsa` and `.ssh/id_rsa.pub` files. Key has to be generated *without passphrase*. Also add your hosts in `.ssh/know_hosts`.

Do that run inside of project folder:

- To build it:

    ```docker build -t telegram_notifier .```

- To install node packages:

    ```docker run --rm -v "$PWD":/app -w /app  node bash -ci 'npm i'```

- To run it:

    ```docker run --name telegram_notifier -tid -p $PORT:3000 -v "$PWD/app":/app -v "$ROOT_FOLDER":/repos -v "$PWD/.ssh":/root/.ssh -w /app node bash -ci 'npm start'```

where:

- `$ROOT_FOLDER` should be a directory containing both path to API instance and path to API documentation