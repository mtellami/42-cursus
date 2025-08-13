def NULL_not_found(object: any) -> int:
    checks = [
        (lambda o: isinstance(o, str) and o == "", "Empty"),
        (lambda o: isinstance(o, float) and o != o, "Cheese"),
        (lambda o: isinstance(o, bool) and o is False, "Fake"),
        (lambda o: isinstance(o, int) and o == 0, "Zero"),
        (lambda o: o is None, "Nothing"),
    ]

    for condition, label in checks:
        if condition(object):
            if label == "Empty":
                print(f"{label}: {type(object)}")
            else:
                print(f"{label}: {object} {type(object)}")
            return 0
    print("Type not Found")
    return 1
