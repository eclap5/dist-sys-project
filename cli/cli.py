import requests
import json
from datetime import datetime

REQ_ENDPOINT = "http://localhost:5050/api/reservations"

def validateTime(date, time):
    #Parsing datetime string to a datetime object and checking its validity. 
    try:
        datetime_object = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
        return datetime_object.strftime("%Y-%m-%dT%H:%M:%S")
    except ValueError:
        print("Invalid date and/or time format. Use YYYY-MM-DD for dates, HH:MM on starting and ending time.")

def makeReservation():
    title = input("Input title: ")
    user = input("Input name: ")
    description = input("Input description: ")
    date = input("Input date for reservation (YYYY-MM-DD): ")
    startTime = input("Input starting time for reservation (HH:MM): ")
    endTime = input("Input ending time for reservation (HH:MM): ")

    startDateTime = validateTime(date, startTime)
    endDateTime = validateTime(date, endTime)

    if not startDateTime or not endDateTime: # Ensuring no bad or nonexisting data is sent
        return
    
    data = {
        "title": title,
        "user": user,
        "description": description,
        "startDateTime": startDateTime,
        "endDateTime": endDateTime
    }

    # dict to json object
    jsonData = json.dumps(data)

    response = requests.post(REQ_ENDPOINT, json=jsonData)
    if response.status_code != 200:
        print(f"Reservation failed: {response.text}")
    else:
        print("Reservation created.")


def listReservations():
    response = requests.get(REQ_ENDPOINT)
    if response.status_code != 200:
        print(f"Failed to list reservations: {response.text}")
    else:
        reservations = response.json()
        for reservation in reservations:
            print(reservation)


def menu():
    while True:
        print("1. Make a reservation")
        print("2. List reservations")
        print("3. Exit")

        choice = input("Enter choice: ")

        match choice:
            case "1":
                makeReservation()
            case "2":
                listReservations()
            case "3":
                break
            case _:
                print("Invalid input. Try 1-3.")

if __name__ == "__main__":
    menu()