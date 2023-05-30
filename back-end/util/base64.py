import cv2
import base64

def convert_to_base64(img):
    retval, buffer = cv2.imencode('.jpg', img)
    jpg_as_text = base64.b64encode(buffer)
    return jpg_as_text

def resize_img(img, down_to = 1, up_to = 1):
    """
        resize down 4 times
    """
    height, width = img.shape[:2]
    _resize = cv2.resize(img, (round(width * up_to/down_to), round(height * up_to/down_to)))
    return _resize