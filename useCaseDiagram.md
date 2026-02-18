# Use Case Diagram

```mermaid
useCaseDiagram
    actor "Customer" as C
    actor "Admin" as A

    package "Forever E-commerce" {
        usecase "Register/Login" as UC1
        usecase "Browse Products" as UC2
        usecase "Search Products" as UC3
        usecase "Filter by Category" as UC4
        usecase "View Product Details" as UC5
        usecase "Select Size" as UC6
        usecase "Add to Cart" as UC7
        usecase "Manage Cart" as UC8
        usecase "Manage Products (CRUD)" as UC9
        usecase "Upload Product Images" as UC10
    }

    C --> UC1
    C --> UC2
    C --> UC3
    C --> UC4
    C --> UC5
    C --> UC6
    C --> UC7
    C --> UC8

    A --> UC1
    A --> UC9
    A --> UC10
```
