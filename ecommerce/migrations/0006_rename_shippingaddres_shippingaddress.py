# Generated by Django 4.2.2 on 2023-06-18 11:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0005_rename_totalprice_order_totalprice'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ShippingAddres',
            new_name='ShippingAddress',
        ),
    ]