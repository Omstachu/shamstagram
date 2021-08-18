from app.models import db, Post


# Adds a demo Post, you can add other Posts here if you want
def seed_posts():
    ape = Post(
        imageId=1, userId=1, description='ape')
    table = Post(
        imageId=2, userId=2, description='table')
    hot_sauce = Post(
        imageId=3, userId=3, description='hot sauce')

    db.session.add(ape)
    db.session.add(table)
    db.session.add(hot_sauce)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the Posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE Posts RESTART IDENTITY CASCADE;')
    db.session.commit()
