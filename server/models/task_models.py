from server.data_base.data_base_init import db


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(150), nullable=False)
    parent_task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    executor_id = db.Column(db.Integer, db.ForeignKey('employee.id'),
                            nullable=False)
    deadline = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    sort_order = db.Column(db.Integer)