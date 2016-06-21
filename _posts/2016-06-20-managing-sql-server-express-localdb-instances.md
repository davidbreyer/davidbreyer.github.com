---
layout: post
title: "Managing SQL Server Express Localdb Instances"
description: ""
category: Programming
tags: [Visual Studio, SQL Server, Command Line]
meta_description: 'Managing SQL Server Express Localdb Instances'
browser_title: 'Managing SQL Server Express Localdb Instances'
comments: true
banner_image: programming-banner-6.jpg
banner_image_alt: Banner Image
---

# Managing SQL Server Express LocalDB instances

[Microsoft SQL Server 2016 Express LocalDB](https://msdn.microsoft.com/en-us/library/hh510202.aspx) is an version of SQL Server Express targeted to developers. MSSQL LocalDB is not installed by default, it can be installed with Visual Studio 2015 using a custom install. It can also be added to an existing Visual Studio 2015 installation by re-running the installation and choosing to modify the installation by adding [Microsoft SQL Server Data Tools](https://msdn.microsoft.com/en-us/mt186501.aspx).

Using the SQL Server Object Explorer you can access all your local SQL Server Express instances. While you can delete instances from this view, you cannot create or update them to new SQL Server versions.

# Command Line

## View Existing Instances

```
C:\>sqllocaldb info
MSSQLLocalDB
ProjectsV12
ProjectsV13
```

## View Installed SQL Server versions

```
C:\>sqllocaldb versions
Microsoft SQL Server 2014 (12.0.2000.8)
Microsoft SQL Server 2016 Release Candidate 0 (RC0) (13.0.1100.286)
```

## View instance details

```
L:\>sqllocaldb info "ProjectsV12"
Name:               ProjectsV12
Version:            12.0.2000.8
Shared name:
Owner:              dbreyer
Auto-create:        No
State:              Stopped
Last start time:    5/25/2016 10:43:53 AM
Instance pipe name:
```

```
L:\>sqllocaldb info MSSQLLocalDB
Name:               MSSQLLocalDB
Version:            13.0.1100.286
Shared name:
Owner:              dbreyer
Auto-create:        Yes
State:              Running
Last start time:    5/25/2016 10:43:24 AM
Instance pipe name: np:\\.\pipe\LOCALDB#0E377D23\tsql\query
```

## Create Instance

### Latest Version

```
C:\>sqllocaldb create MyNewInstance
LocalDB instance "MyNewInstance" created with version 13.0.1100.286.
```

### Specific Version

```
C:\>sqllocaldb create MyNewInstance12 12.0.2000.8
LocalDB instance "MyNewInstance12" created with version 12.0.2000.8.
```

### Auto-Create
The MSSQLLocalDB has the auto-create flag set to true. Deleting this instance will cause the instance to be recreated with the lastest installed SQL Server version.

### Create a Shared Instance

Adding a shared instance to an existing localdb database will support multiple users connecting to a single instance.

Connect to a shared instance with a ```.\``` between (localdb) and the name of the shared instance. (i.e. ```(localdb)\.\MyShare``` )

```
sqllocaldb share MyNewInstance "MySharedDB"
Private LocalDB instance "MyNewInstance" shared with the shared name: "MySharedDB".
```

## Delete Instance

While it's possible to delete instances from the SQL Server Object Explorer view, this can also be done by command line.

```
C:\>sqllocaldb delete MyNewInstance12
LocalDB instance "MyNewInstance12" deleted.
```

If you attempt to delete a running instance, you will get the following.

```
C:\>sqllocaldb delete MyNewInstance12
Delete of LocalDB instance "MyNewInstance12" failed because of the following error:
Requested operation on LocalDB instance cannot be performed because specified in
stance is currently in use. Stop the instance and try again.
```

Simply use the stop command to close the instance, then rerun the delete command.

```
C:\>sqllocaldb stop MyNewInstance12
LocalDB instance "MyNewInstance12" stopped.
```