

activate="./venv/bin/activate";
if [ ! -f $activate ]; then 
	virtualenv venv --python=python3;
fi
source $activate;
pip install -r requirements.txt;
cd petfndr;
python manage.py makemigrations;
python manage.py migrate;
python manage.py parsepets;
cd -;

cd petapp;
npm install;
cd -;
