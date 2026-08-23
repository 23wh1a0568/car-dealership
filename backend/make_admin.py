import sqlite3

conn = sqlite3.connect("car_dealership.db")
cursor = conn.cursor()

email = input("Enter the email to make admin: ")

cursor.execute(
    "UPDATE users SET role = 'admin' WHERE email = ?",
    (email,)
)

conn.commit()

if cursor.rowcount == 1:
    print(f"{email} is now an admin.")
else:
    print("User not found.")

conn.close()

#for running it :
#run:
#python make_admin.py