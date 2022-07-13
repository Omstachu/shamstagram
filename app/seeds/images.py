from app.models import db, Image


# Adds a demo Post, you can add other Posts here if you want
def seed_images():
    mountain = Image(
        alt_text='Mount Washington', url='http://shamstagram-bucket.s3.amazonaws.com/188f6c84ae9a48cbb1f62e1866d98f3f.jpg')
    band = Image(
        alt_text='Band', url='http://shamstagram-bucket.s3.amazonaws.com/4aab89b0a5eb44a1806a729d5f4eff59.jpg')
    family = Image(
        alt_text='Family', url='http://shamstagram-bucket.s3.amazonaws.com/dca40779d9b34112bad60a57859fd61c.png')

    db.session.add(mountain)
    db.session.add(band)
    db.session.add(family)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the Posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE Images RESTART IDENTITY CASCADE;')
    db.session.commit()
