# Generated by Django 4.2.2 on 2023-06-25 03:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0014_alter_order_totalprice_alter_orderitem_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingaddress',
            name='mobileNo',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
