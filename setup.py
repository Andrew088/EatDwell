"""
Random demo flask app python package configuration.

"""

from setuptools import setup

setup(
    name='eatdwell',
    version='0.1.0',
    packages=['eatdwell'],
    include_package_data=True,
    install_requires=[
        'flask',
        'nodeenv',
        'requests',
        'httpie',
        'pylint'
    ],
)
