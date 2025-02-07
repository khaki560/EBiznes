from django_filters import rest_framework as filters

from .models import *


ALL = 'all'
MORE_1 = 'more_1'
MORE_2 = 'more_2'
MORE_3 = 'more_3'
MORE_4 = 'more_4'
FIVE = 'five'


class ServiceFilter(filters.FilterSet):
    profession = filters.CharFilter(field_name='profession__name', lookup_expr='icontains')
    city = filters.CharFilter(field_name='city', lookup_expr='icontains')

    class Meta:
        model = Service
        fields = ['owner', 'profession', 'city']

    @property
    def qs(self):
        queryset = super().qs
        rating = getattr(self.request.GET, 'rating', None)

        rating = self.request.GET.get('rating', None)

        # TODO USE DB INSTEAD OF PROPERTY
        if rating:
            if rating == MORE_1:
                return [service for service in queryset if service.rate > 1]

            if rating == MORE_2:
                return [service for service in queryset if service.rate > 2]

            if rating == MORE_3:
                return [service for service in queryset if service.rate > 3]

            if rating == MORE_4:
                return [service for service in queryset if service.rate > 4]

            if rating == FIVE:
                return [service for service in queryset if service.rate == 5]

        return queryset


class RentFilter(filters.FilterSet):
    class Meta:
        model = Rent
        fields = ('user',)
