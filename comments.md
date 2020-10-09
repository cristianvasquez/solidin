Oct 9

@solid/community-server": "^0.1.1 

Pros:
- Fast
- Can run without ACL
- Can use distinct stores

Cons:
- Architected to do too much stuff. It's an elephant. 
- Uses a non-orthodox dependency injection framework. 
- Complexity is already high, too many interdependencies

* Several components could be transformed into small express modules.
    - Representations from A <=> B could be taken out of this codebase.
    - Operation handlers all around. Several stores mixed in. Lacks the concept of adapter.

Example: 
 'Composite Store' + url patterns + several stores. 
