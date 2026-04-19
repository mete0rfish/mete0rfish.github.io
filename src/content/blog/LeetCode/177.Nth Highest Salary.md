---
title: "[LeetCode] #177 Nth Highest Salary"
description: "177. Nth Highest Salary 문제 풀이 (SQL Server)"
category: "SQL"
pubDate: "2026-04-19"
updatedDate: "2026-04-19"
tags: ["LeetCode"]
---
# 문제
Table: Employee

+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id is the primary key (column with unique values) for this table.
Each row of this table contains information about the salary of an employee.
 

Write a solution to find the nth highest distinct salary from the Employee table. If there are less than n distinct salaries, return null.

The result format is in the following example.

# 문제 해결
DENSE_RANK를 이용하여 salary별 랭크를 구하고, @N과 일치하는 salary만 출력하도록 구한다.

```sql
CREATE FUNCTION getNthHighestSalary(@N INT) RETURNS INT AS
BEGIN
    RETURN (
        SELECT TOP 1 salary
        FROM (
            SELECT 
                salary, 
                DENSE_RANK() OVER (ORDER BY salary DESC) AS sal_rank
            FROM Employee
        ) r
        WHERE sal_rank = @N
    );
END
```
