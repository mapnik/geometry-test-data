This is a suite of test data used for recording proper formatting in Mapnik's handling of polygons. All `input` files are unique GeoJSON `Polygon` rings that get passed through tests related to line simplification, polygon fill types, multipolygon unions (MPU), and bounding box configurations. You can view these tests here in the [Mapnik Vector Tile test](https://github.com/mapbox/mapnik-vector-tile/blob/master/test/geometry_visual_test.cpp#L250-L293).

The `benchmark` directory is currently used for storing other test data less specific to polygon encoding.
