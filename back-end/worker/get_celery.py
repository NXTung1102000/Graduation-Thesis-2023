import asyncio
import sys
sys.path.append("..") 

from celery import Celery
from config import Settings
import time
__celery = None


def get_celery() -> Celery:
	"""
	Get the current Celery instance.
	Initialize the instance if not yet done

	:return: The current Celery instance
	:rtype: Celery
	"""

	global __celery
	if __celery is None:
		settings = Settings()

		__celery = Celery('jobs',
			broker=settings.celery_broker,
			backend=settings.celery_backend,
			result_expires=settings.celery_result_expires,
		)
		# __celery.conf.update(
		# 	{
		# 		"accept_content": ["json", "msgpack"],
		# 		"task_serializer": "msgpack",
		# 		"task_compression": "zstd",
		# 	}
		# )
		

	return __celery


def a_get_result(result, poll_interval=0.1):
	"""
	Periodically polls Celery for a job's result in an async manner.
	This helps reduce blocking IO when waiting for Celery in FastAPI, although not very effectively.
	Only used by the v1 API to wait for job in SYNC mode.
	The new v2 API uses native asyncio instead of Celery.

	:param result: The Celery result object
	:param poll_interval: Time in seconds to poll for result, defaults to 0.05
	:type poll_interval: float, optional
	:return: The job's result
	"""
	while True:
		#if result.ready():
		return result.get()
		time.sleep(poll_interval)