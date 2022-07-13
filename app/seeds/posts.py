from app.models import db, Post


# Adds a demo Post, you can add other Posts here if you want
def seed_posts():
    mountain = Post(
        imageId=1, userId=1, description='View from Mount Washington')
    band = Post(
        imageId=2, userId=2, description='Greta Van Fleet')
    family = Post(
        imageId=3, userId=3, description='Photoshoped Family')

    db.session.add(mountain)
    db.session.add(band)
    db.session.add(family)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the Posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE Posts RESTART IDENTITY CASCADE;')
    db.session.commit()
