class RadiusDeskRouter(object):
    """
    radiusdesk/models.py => radiuesdeskdb, others => default
    """

    def db_for_read(self, model, **hints):
        "Point all operations on radiusdesk models to 'radiusdeskdb'"
        if model._meta.app_label == 'radiusdesk':
            return 'radiuesdeskdb'
        return 'default'

    def db_for_write(self, model, **hints):
        "Point all operations on chinook models to 'radiusdeskdb'"
        if model._meta.app_label == 'radiuesdesk':
            return 'radiusdeskdb'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        "Allow any relation if a both models in radiusdesk app"
        if obj1._meta.app_label == 'radiusdesk' and obj2._meta.app_label == 'radiusdesk':
            return True
        # Allow if neither is chinook app
        elif 'radiusdesk' not in [obj1._meta.app_label, obj2._meta.app_label]:
            return True
        return False

    def allow_syncdb(self, db, model):
        if db == 'radiusdeskdb' or model._meta.app_label == "radiusdesk":
            return False  # we're not using syncdb on our legacy database
        else:  # but all other models/databases are fine
            return True
