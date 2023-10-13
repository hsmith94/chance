from fastapi import APIRouter

router = APIRouter(prefix="/api")

@router.get('/items/{item_id}')
def read_item(item_id: int, q: str = None):
    return {'item_id': item_id, 'q': q}


@router.get('/fizz_buzz/{num}')
def read_item(num: int):
    # https: // ja.wikipedia.org / wiki / Fizz_Buzz
    if not num % 15:
        return {num: 'Fizz Buzz'}
    elif not num % 5 or not num % 3:
        return {num: 'Fizz' if not num % 3 else 'Buzz'}
    else:
        return {num: 'Stay Silent'}
