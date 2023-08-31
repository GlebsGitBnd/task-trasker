from server.data_base.data_base_init import db


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(50), nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    position = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)