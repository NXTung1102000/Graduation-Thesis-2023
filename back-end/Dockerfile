# 
FROM python:3.9

# 
WORKDIR /back_end

# 
COPY ./requirements.txt /back_end/requirements.txt

# 
RUN pip install --upgrade pip
RUN pip install -U setuptools
RUN pip install --no-cache-dir --upgrade -r /back_end/requirements.txt

# 
COPY . /back_end

# 
CMD ["uvicorn", "app:app", "--host=0.0.0.0", "--port=80"]