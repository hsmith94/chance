#### Python version management

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

Configure pyenv any time your terminal opens:

```
$ echo -e 'eval "$(pyenv init -)"' >> ~/.bash_profile
```

#### Virtual Environment

We will use `pyenv-virtualenv` for virtual env setup:

```
$ brew install pyenv-virtualenv
```

Configure `pyenv-virtualenv` any time your terminal opens:

```
$ echo -e 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile
```

Create a virtual environment:

```
$ pyenv virtualenv $(cat runtime.txt | sed 's/python-//g') chance_app
```

Enter virtual environment:

```
$ pyenv shell chance_app
```

Exit virtual environment:

```
$ pyenv shell system
```

#### Installing dependencies

Once you're inside the virtual environment, run the following command to install dependencies:

```
$ pip install -r requirements.txt
```

## Deployment management

Using Heroku.

Install the Heroku CLI:

```
$ brew tap heroku/brew && brew install heroku
```

To login run:

```
$ heroku login
```

Set up Heroku remote:

```
$ heroku git:remote -a chance-application
```

Deploying code:

```
$ git push heroku master
```
