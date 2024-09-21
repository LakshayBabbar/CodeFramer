FROM python:3.10-slim

RUN adduser --disabled-password --gecos '' appuser

WORKDIR /app

COPY app.py .

RUN pip install flask gunicorn RestrictedPython

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]