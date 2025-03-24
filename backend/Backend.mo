import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor class Backend() {

    type Field = { fieldName : Text; fieldValue : Text };
    type EntitySchema = { eid : Text; uid : Text; fields : [Field] };
    type Result_2 = { #ok : Text; #err : Text };
    type Result_5 = { #ok : [StableEntity]; #err : Text };
    type entityId = Text;
    type worldId = Text;
    type StableEntity = {
        eid : entityId;
        wid : worldId;
        fields : [Field];
    };

    stable var preRegisteredUsers : [Principal] = [];

    stable var usersThatShared : [Principal] = [];

    public shared query func howManyPreRegistered() : async Nat {
        return Array.size(preRegisteredUsers);
    };

    public shared query func getPreRegisteredIds() : async [Principal] {
        return preRegisteredUsers;
    };

    stable var accesedByH = 0;

    stable var accesedByC = 0;

    public shared query func isPreRegistered(userPrincipal : Principal) : async Bool {
        if (Array.indexOf(userPrincipal, preRegisteredUsers, Principal.equal) != null) {
            return true;
        } else {
            return false;
        };
    };

    public shared func accessByH() : async () {
        accesedByH := accesedByH + 1;
    };

    public shared func accessByC() : async () {
        accesedByC := accesedByC + 1;
    };

    public shared query func howManyAccesedByH() : async Nat {
        return accesedByH;
    };

    public shared query func howManyAccesedByC() : async Nat {
        return accesedByC;
    };

    //public shared func resetAccessArrays() : async () {
    // accesedByH := 0;
    // accesedByC := 0;
    //};

    //public shared func resetPreRegisteredUsers() : async () {
    // preRegisteredUsers := [];
    //};

    public shared func share(userPrincipal : Principal) : async Text {
        if (Array.indexOf(userPrincipal, usersThatShared, Principal.equal) != null) {
            return "Thank you for sharing! Keep an eye on the DIGGY X account to know when the gold for this will be received. Also keep an eye on Konecta Missions to earn up to 200 more gold!";
        } else {
            usersThatShared := Array.append(usersThatShared, [userPrincipal]);
            return "Thank you for sharing! Keep an eye on the DIGGY X account to know when the gold for this will be received. Also keep an eye on Konecta Missions to earn up to 200 more gold!";
        };
    };

    public shared func preRegisterUser(userPrincipal : Principal) : async Text {

        let diggyBackend = actor ("bg4su-6iaaa-aaaap-anxsa-cai") : actor {
            createEntity : shared EntitySchema -> async Result_2;
            getAllUserEntities : shared { uid : Text; page : ?Nat } -> async Result_5;
        };

        if (Array.indexOf(userPrincipal, preRegisteredUsers, Principal.equal) != null) {
            return "You are already pre-registered. Keep an eye on Konecta Missions to earn up to 200 more gold!";
        } else {
            var firstAmount = "30";

            let hasEntities = await diggyBackend.getAllUserEntities({
                uid = Principal.toText(userPrincipal);
                page = null;
            });

            switch (hasEntities) {
                case (#ok(entities)) {
                    if (Array.size(entities) > 0) {
                        let maybeEntity = Array.find<StableEntity>(
                            entities,
                            func(e : StableEntity) : Bool {
                                return e.eid == "diggycoin" and e.wid == "bg4su-6iaaa-aaaap-anxsa-cai";
                            },
                        );

                        switch (maybeEntity) {
                            case (?entity) {
                                let maybeField = Array.find<Field>(
                                    entity.fields,
                                    func(f : Field) : Bool {
                                        return f.fieldName == "amount";
                                    },
                                );
                                switch (maybeField) {
                                    case (?field) {
                                        let parts = Iter.toArray(Text.split(field.fieldValue, #char '.'));
                                        let intPart = if (Array.size(parts) > 0) {
                                            parts[0];
                                        } else {
                                            field.fieldValue;
                                        };
                                        switch (Nat.fromText(intPart)) {
                                            case (?n) {
                                                firstAmount := Nat.toText(n + 30);
                                            };
                                            case null {
                                                firstAmount := field.fieldValue;
                                            };
                                        };
                                    };
                                    case null {};
                                };
                            };
                            case null {};
                        };
                    };
                };
                case (#err(_)) {
                    return "Error! Please try again later";
                };
            };

            let entitySchema : EntitySchema = {
                eid = "diggycoin";
                uid = Principal.toText(userPrincipal);
                fields = [{ fieldName = "amount"; fieldValue = firstAmount }];
            };
            let result = await diggyBackend.createEntity(entitySchema);
            switch (result) {
                case (#ok(_)) {
                    preRegisteredUsers := Array.append(preRegisteredUsers, [userPrincipal]);
                    return "Success! 30 gold added to your account. You now have " # firstAmount # " gold. Keep an eye on Konecta Missions to earn up to 200 more gold!";
                };
                case (#err(_)) {
                    return "Error! Please try again later";
                };
            };
        };
    };
};
