Oct 9

@solid/community-server": "^0.1.1 

Pros:
- Fast
- Can run without ACL
- Can use distinct stores

Cons:
- Tries to do too much stuff. It's an elephant.
- Uses a house-made dependency injection framework. Development is difficult
- Architected with excessive interdependencies. 
- Complexity is already high (cannot grow too much).

* Several components could be transformed into small express modules.
    - Transformation of representations from A <=> B could be done outside this codebase.
    - Operation handlers all around. This could be an interface a third party store implements

Examples: 
 'Composite Store' + url patterns + several stores. Why not to just mount a store to a path? 
