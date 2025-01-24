from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to allow only owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request
        if request.method in SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the object
        return obj.user == request.user


class IsAuthenticatedOrReadOnly(BasePermission):
    """
    Custom permission to allow only authenticated users to write,
    but anyone can read.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated
