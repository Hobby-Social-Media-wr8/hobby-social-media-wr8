UPDATE profile 
SET interests_list = $1
WHERE profile_id = $2;

SELECT interests_list FROM profile
WHERE profile_id = $2;
