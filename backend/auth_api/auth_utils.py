import hashlib


def utf8(str_to_encode: str) -> str:
    return str(str_to_encode).encode('utf-8')

def make_hash(salt: str, secret: str) -> str:
    str_to_hash = f'{salt}:{secret}'
    md5_obj = hashlib.md5(utf8(str_to_hash))
    return md5_obj.hexdigest()