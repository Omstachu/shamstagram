"""empty message

Revision ID: 0d35226620fb
Revises: fc2d849d9f6d
Create Date: 2021-10-07 17:03:52.291601

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d35226620fb'
down_revision = 'fc2d849d9f6d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('likes', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'posts', 'users', ['userId'], ['id'])
    op.create_foreign_key(None, 'posts', 'images', ['imageId'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'posts', type_='foreignkey')
    op.drop_constraint(None, 'posts', type_='foreignkey')
    op.drop_column('posts', 'likes')
    # ### end Alembic commands ###
