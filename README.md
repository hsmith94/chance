Recommended to use Pyenv for Python version management.

On MacOS, make sure you have [homebrew](https://brew.sh/) installed, then run:

```
$ brew install pyenv
```

Validate the installation worked by running `$ pyenv --version`. You should see output like: `pyenv 2.3.27`.

To install the project's Python runtime version, run:

```
$ pyenv install $(cat runtime.txt | sed 's/python-//g')
```

## Deployment management

Using Heroku.

Install the Heroku CLI, then run:

```
$ heroku login
```
