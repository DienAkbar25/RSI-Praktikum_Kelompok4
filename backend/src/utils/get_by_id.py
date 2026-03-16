def get_by_id(id, arr):
    """
    implements brute force alg to search through a list by id
    """

    if len(arr) <= 0:
        return False

    if "id" not in arr[0]:
        return False

    for item in arr:
        item_id = item["id"]

        if id == item_id:
            return item

    return False
