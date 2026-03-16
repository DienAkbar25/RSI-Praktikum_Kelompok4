def get_by_id(id, arr):
    """
    implements brute force alg to search through a list by id
    """

    if len(arr) <= 0:
        return False

    if not hasattr(arr[0], "id"):
        return False

    for idx, item in enumerate(arr):
        if id == item.id:
            return idx

    return False
