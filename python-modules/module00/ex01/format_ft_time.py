from datetime import datetime

today = datetime.now()
unix = datetime.fromtimestamp(0)

formated_today = today.strftime("%b %-d %Y")
formated_epoch = unix.strftime("%B %-d, %Y")

delta = today - unix
delta_in_seconds = delta.total_seconds()

seconds_formated = f"{delta_in_seconds:,.4f}"
scientific_notation = "{:.2e}".format(delta_in_seconds)

print(
    f"Seconds since {formated_epoch}: {seconds_formated} or {scientific_notation} in scientific notation"
)
print(formated_today)
