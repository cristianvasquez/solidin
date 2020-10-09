oct 9

Pros:
- Fast
- Can run without ACL
- Can use distinct stores

Cons:
- Tries to do too much stuff. It's an elephant.
- Uses a house-made dependency injection framework. Hinders development.
- Architected with excessive interdependencies. 
- Complexity is already high (cannot grow too much).

* Several components could be transformed into small express modules.
    - Transformation of representations from A <=> B could be done outside this codebase.
    - Operation handlers all around. This could be an interface a third party store implements

Examples: 
 'Composite Store' a complicated object with url patterns and all. 


not to use yet.
