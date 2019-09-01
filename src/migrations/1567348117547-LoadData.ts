import {MigrationInterface, QueryRunner} from "typeorm";

export class LoadData1567348117547 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        //copied from resources/Maker_Insert_Database.sql
        await queryRunner.query(
            `
            INSERT INTO sculpture_maker ("id", "firstName", "lastName", "birthYear", "deathYear", "info", "wikiUrl", "nationality") 
            VALUES
            ('40824dd1-c59f-40a8-a103-df3386d26d6e', 'Adrian', 'MAURIKS', 1942, NULL, 'placeholder', 'placeholder', 'Dutch'),
            ('b9731206-230a-47d3-9730-fa8fe454e408', 'Anthony', 'GOW,', NULL, NULL, 'placeholder', 'placeholder', 'Unknown'),
            ('d752c9cc-8f08-48e5-b5ed-de9b334d1be8', 'Bert', 'FLUGELMAN', 1923, 2013, 'placeholder', 'https://en.wikipedia.org/wiki/Bert_Flugelman', 'Austrian'),
            ('a3b857fa-f2d0-4be7-b3df-ab833e9067a6', 'Bradley', 'Eastman', 1980, NULL, 'placeholder', 'https://beastman.com.au/', 'Australian'),
            ('98f65eea-6879-47b5-b295-7f0df78e464b', 'Didier', 'Balez', 1960, NULL, 'placeholder', 'https://www.didierbalez.com/', 'Unknown'),
            ('df4ebb9e-f458-43c5-914a-9d49a617fca0', 'Gaby', 'Porter', 1943, NULL, 'placeholder', 'http://www.gabyporter.com.au/', 'Australian'),
            ('54afc2d6-a9be-4968-867f-45dc64a68f3b', 'Gino', 'SANGUINETI', 1926, 2011, 'placeholder', 'http://ginosanguineti.com/Gino_Sanguineti_Summary.htm', 'Italian'),
            ('8955cb1e-3efd-4ab5-8586-1c09abd05d93', 'Guy', 'BOYD', 1923, 1988, 'placeholder', 'https://en.wikipedia.org/wiki/Guy_Boyd_(sculptor)', 'Australian'),
            ('8788a81a-5673-41de-b8d8-4b799b5d49b1', 'Lesley', 'GOLDACRE', 1953, NULL, 'placeholder', 'placeholder', 'Unknown'),
            ('0cb220c5-1b28-475e-b1ae-a53ffeefc530', 'Lis', 'JOHNSON', 1963, NULL, 'placeholder', 'https://www.lisjohnson.com.au/', 'Australian'),
            ('61f0b733-b38c-4d2f-86e6-968440312ebf', 'May', 'BARRIE', 1918, NULL, 'placeholder', 'placeholder', 'Australian'); 
            `
        );

        //copied from resources/Sculpture_Insert_Database.sql
        await queryRunner.query(
            `
            INSERT INTO sculpture ("accessionId", "name", "primaryMakerId", "productionDate", "material", "creditLine", "currentLocation", "locationNotes") 
            VALUES
           ( '1991.042', 'The Oldest Man', '40824dd1-c59f-40a8-a103-df3386d26d6e', '1991', 'Bronze', 'Commissioned 1991.', 'MC/University of Wollongong Art Collection', 'Main campus, eastern side of Building 30, on grassed and garden area.'),
           ( 'unknown0', 'Horse Head', 'b9731206-230a-47d3-9730-fa8fe454e408', '1991', 'stainless steel', '', '', ''),
           ( '1989.067', 'Winged Figure (Lawrence Hargrave Memorial)', 'd752c9cc-8f08-48e5-b5ed-de9b334d1be8', '1988-1989', 'Stainless steel', 'Commissioned by the Friends of the University of Wollongong in celebration of the Australian Bicentenary, 1988.', 'MC/University of Wollongong Art Collection', 'Main campus, on UOW land on the western side of  Robsons Road, Keiraville. Walking track entry from corner of Robsons Road and Norethfields Avenue.'),
           ( '2015.076', 'Hargrave Library Sculpture', 'd752c9cc-8f08-48e5-b5ed-de9b334d1be8', '2008', 'Stainless steel', 'Commissioned by UOW Library with generous support from Taylor Brammer Landscape and Architects, 2008.', '0016/MC/University of Wollongong Art Collection', 'Main campus, in garden bed, near the eastern  Library entrance, Building 16.'),
           ( '1987.081', 'Gateway to Mount Keira', 'd752c9cc-8f08-48e5-b5ed-de9b334d1be8', '1985', 'Stainless steel', 'Gift of the artist 1987.', 'MC/University of Wollongong Art Collection', 'Moved from East side of the Ring Road in front of Western car park near Buildings 21 and 23, to the western side of the Ring Road accross from Building 30.'),
           ( '2015.003', 'Future Nature', 'a3b857fa-f2d0-4be7-b3df-ab833e9067a6', '2015-01-01 00:00:00', 'Acrylic paint and molotow aerosol paint', 'Commissioned 2014.', '0021/MC/University of Wollongong Art Collection', 'along the 38 metre long external courtyard wall of building 21, main campus.'),
           ( 'unknown1', 'Evil Duck', '98f65eea-6879-47b5-b295-7f0df78e464b', '', '', '', '', ''),
           ( '2018.044', 'Genesis', 'df4ebb9e-f458-43c5-914a-9d49a617fca0', '1987', 'Somersby sandstone', 'Donated through the Australian Government''s Cultural Gifts Program by Gaby Porter.', '0031/MC/University of Wollongong Art Collection', ''),
           ( '2012.092', 'The Keira Mob', 'df4ebb9e-f458-43c5-914a-9d49a617fca0', '2012', 'bronze cast', 'Commissioned by University of Wollongong 2012', 'MC/University of Wollongong Art Collection', 'Main campus, amongst the trees on the lawn, northern side if Building 12, south side of Building 15 and western side of Building 4.'),
           ( '2001.076', 'Midnight', '54afc2d6-a9be-4968-867f-45dc64a68f3b', '1985', 'painted steel', 'Gift of the artist', 'MC/University of Wollongong Art Collection', 'Main Campus, in White Cedar Courtyard near Buildings 35 and 14'),
           ( '2001.077', 'Torso 1', '54afc2d6-a9be-4968-867f-45dc64a68f3b', '1989', 'painted steel', 'Gift of the artist', 'MC/University of Wollongong Art Collection', 'Main Campus, in White Cedar Courtyard near Buildings 35 and 14'),
           ( '1994.076', 'The Prodigal Son', '8955cb1e-3efd-4ab5-8586-1c09abd05d93', '1987', 'Cast aluminium with bronze patina', 'Donated through the Australian Government''s Cultural Gifts Program by Phyllis Emma Boyd.', '0067/MC/University of Wollongong Art Collection', 'Main campus, on south facing wall of Building 67'),
           ( '2018.046', 'Winged Bull of St Luke 1964', '8788a81a-5673-41de-b8d8-4b799b5d49b1', '1996', 'Silver gelatin print', 'Purchased 2018.', 'G10C/G/0025/MC/University of Wollongong Art Collection', ''),
           ( '1986.058', 'Art is a ......', '0cb220c5-1b28-475e-b1ae-a53ffeefc530', '1984', 'Ciment Fondu', 'Purchased 1986', '0036/MC/University of Wollongong Art Collection', 'Main campus, on exterior wall of Building 36, near western entrance.'),
           ( '1987.08', 'Viva Solaris', '61f0b733-b38c-4d2f-86e6-968440312ebf', '1976-1977', 'Angaston marble', 'Purchased 1977.', 'MC/University of Wollongong Art Collection', 'Main campus, McKinnon lawn near duckpond, to the south of Building 36 and east of Building 67.'); 
           `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
