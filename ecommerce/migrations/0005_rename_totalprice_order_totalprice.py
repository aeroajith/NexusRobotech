# Generated by Django 4.2.2 on 2023-06-18 02:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0004_rename_total_price_order_totalprice'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='totalprice',
            new_name='totalPrice',
        ),
    ]
