import {MigrationInterface, QueryRunner} from "typeorm";

export class LoadImageLinks1568132053728 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
        INSERT INTO sculpture_image ("sculptureId", s3bucket, s3key, url)
        VALUES
        ('1986.058', 'uowac-sculpture-images', '1986.058/IMG_2524.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1986.058/IMG_2524.JPG'),
        ('1987.08', 'uowac-sculpture-images', '1987.08/IMG_2477.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1987.08/IMG_2477.JPG'),
        ('1987.08', 'uowac-sculpture-images', '1987.08/IMG_2478.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1987.08/IMG_2478.JPG'),
        ('1987.08', 'uowac-sculpture-images', '1987.08/IMG_2480.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1987.08/IMG_2480.JPG'),
        ('1987.08', 'uowac-sculpture-images', '1987.08/IMG_2486.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1987.08/IMG_2486.JPG'),
        ('1987.081', 'uowac-sculpture-images', '1987.081/IMG_2477.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1987.081/IMG_2477.JPG'),
        ('1989.067', 'uowac-sculpture-images', '1989.067/IMG_2559.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1989.067/IMG_2559.JPG'),
        ('1991.042', 'uowac-sculpture-images', '1991.042/IMG_2509.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1991.042/IMG_2509.JPG'),
        ('1991.042', 'uowac-sculpture-images', '1991.042/IMG_2513.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1991.042/IMG_2513.JPG'),
        ('1991.042', 'uowac-sculpture-images', '1991.042/IMG_2519.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1991.042/IMG_2519.JPG'),
        ('2001.076', 'uowac-sculpture-images', '2001.076/IMG_2500.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.076/IMG_2500.JPG'),
        ('2001.076', 'uowac-sculpture-images', '2001.076/IMG_2501.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.076/IMG_2501.JPG'),
        ('2001.077', 'uowac-sculpture-images', '2001.077/IMG_2270.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.077/IMG_2270.JPG'),
        ('2001.077', 'uowac-sculpture-images', '2001.077/IMG_2271.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.077/IMG_2271.JPG'),
        ('2001.077', 'uowac-sculpture-images', '2001.077/IMG_2275.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.077/IMG_2275.JPG'),
        ('2001.077', 'uowac-sculpture-images', '2001.077/IMG_2276.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.077/IMG_2276.JPG'),
        ('2001.077', 'uowac-sculpture-images', '2001.077/IMG_2277.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.077/IMG_2277.JPG'),
        ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2304.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2304.JPG'),
        ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2305.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2305.JPG'),
        ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2306.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2306.JPG'),
        ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2307.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2307.JPG'),
        ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2308.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2308.JPG'),
        ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2310.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2310.JPG'),
        ('2015.003', 'uowac-sculpture-images', '2015.003/IMG_2506.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2015.003/IMG_2506.JPG'),
        ('2015.003', 'uowac-sculpture-images', '2015.003/IMG_2507.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2015.003/IMG_2507.JPG'),
        ('2015.076', 'uowac-sculpture-images', '2015.076/IMG_2532.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2015.076/IMG_2532.JPG'),
        ('2015.076', 'uowac-sculpture-images', '2015.076/IMG_2540.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2015.076/IMG_2540.JPG');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
        WITH temptab AS (
            SELECT id FROM sculpture_image
            JOIN 
            (VALUES
            ('1986.058', 'uowac-sculpture-images', '1986.058/IMG_2524.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1986.058/IMG_2524.JPG'),
            ('1987.08', 'uowac-sculpture-images', '1987.08/IMG_2477.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1987.08/IMG_2477.JPG'),
            ('1987.08', 'uowac-sculpture-images', '1987.08/IMG_2478.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1987.08/IMG_2478.JPG'),
            ('1987.08', 'uowac-sculpture-images', '1987.08/IMG_2480.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1987.08/IMG_2480.JPG'),
            ('1987.08', 'uowac-sculpture-images', '1987.08/IMG_2486.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1987.08/IMG_2486.JPG'),
            ('1987.081', 'uowac-sculpture-images', '1987.081/IMG_2477.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1987.081/IMG_2477.JPG'),
            ('1989.067', 'uowac-sculpture-images', '1989.067/IMG_2559.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1989.067/IMG_2559.JPG'),
            ('1991.042', 'uowac-sculpture-images', '1991.042/IMG_2509.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1991.042/IMG_2509.JPG'),
            ('1991.042', 'uowac-sculpture-images', '1991.042/IMG_2513.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1991.042/IMG_2513.JPG'),
            ('1991.042', 'uowac-sculpture-images', '1991.042/IMG_2519.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1991.042/IMG_2519.JPG'),
            ('2001.076', 'uowac-sculpture-images', '2001.076/IMG_2500.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.076/IMG_2500.JPG'),
            ('2001.076', 'uowac-sculpture-images', '2001.076/IMG_2501.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.076/IMG_2501.JPG'),
            ('2001.077', 'uowac-sculpture-images', '2001.077/IMG_2270.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.077/IMG_2270.JPG'),
            ('2001.077', 'uowac-sculpture-images', '2001.077/IMG_2271.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.077/IMG_2271.JPG'),
            ('2001.077', 'uowac-sculpture-images', '2001.077/IMG_2275.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.077/IMG_2275.JPG'),
            ('2001.077', 'uowac-sculpture-images', '2001.077/IMG_2276.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.077/IMG_2276.JPG'),
            ('2001.077', 'uowac-sculpture-images', '2001.077/IMG_2277.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2001.077/IMG_2277.JPG'),
            ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2304.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2304.JPG'),
            ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2305.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2305.JPG'),
            ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2306.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2306.JPG'),
            ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2307.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2307.JPG'),
            ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2308.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2308.JPG'),
            ('2012.092', 'uowac-sculpture-images', '2012.092/IMG_2310.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2012.092/IMG_2310.JPG'),
            ('2015.003', 'uowac-sculpture-images', '2015.003/IMG_2506.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2015.003/IMG_2506.JPG'),
            ('2015.003', 'uowac-sculpture-images', '2015.003/IMG_2507.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2015.003/IMG_2507.JPG'),
            ('2015.076', 'uowac-sculpture-images', '2015.076/IMG_2532.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2015.076/IMG_2532.JPG'),
            ('2015.076', 'uowac-sculpture-images', '2015.076/IMG_2540.JPG', 'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/2015.076/IMG_2540.JPG'))
            AS t(tid, tbucket, tkey, turl)
            ON tid = "sculptureId" AND tbucket = s3bucket AND tkey = s3key AND turl = url
        )
        DELETE FROM sculpture_image B
        USING temptab C
        WHERE B.id = C.id;
        `)
    }

}
