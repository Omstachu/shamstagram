from app.models import db, Image


# Adds a demo Post, you can add other Posts here if you want
def seed_images():
    ape = Image(
        alt_text='Ape', url='http://shamstagrambucket.s3.amazonaws.com/4d8ee9b5b04249399c6774c45b06d24e.png')
    table = Image(
        alt_text='Table', url='http://shamstagrambucket.s3.amazonaws.com/015086c7ee4a4216bbf2d9b3e2e04b26.jpg')
    drawer = Image(
        alt_text='Drawer', url='http://shamstagrambucket.s3.amazonaws.com/015086c7ee4a4216bbf2d9b3e2e04b26.jpg')

    db.session.add(ape)
    db.session.add(table)
    db.session.add(drawer)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the Posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE Images RESTART IDENTITY CASCADE;')
    db.session.commit()
