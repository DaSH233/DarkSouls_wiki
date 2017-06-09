use ds;
drop table detail;
drop table basic_info;
drop table items;
create table items (
tag varchar(255) primary key,
tab text,
type text,
name text,
icon text
)DEFAULT charset=utf8;
create table basic_info (
tag varchar(255) primary key,
icon_big text,
damage_type text,
skill text,
fp_cost text,
physic_attack text,
physic_defense text,
magic_attack text,
magic_defense text,
fire_attack text,
fire_defense text,
lightning_attack text,
lightning_defense text,
dark_attack text,
dark_defense text,
wp_critical text,
wp_stability text,
weight text,
durabilitiy text,
bleed text,
poison text,
stg_req text,
dex_req text,
int_req text,
faith_req text,
stg_bonus text,
dex_bonus text,
int_bonus text,
faith_bonus text,
foreign key(tag) references items(tag)
)DEFAULT charset=utf8;
create table detail(
tag varchar(255) primary key,
introductions mediumtext,
tips mediumtext,
from_where mediumtext,
foreign key(tag) references items(tag)
)DEFAULT charset=utf8;
