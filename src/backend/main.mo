import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

actor {
  // Include access control and blob storage mixins
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Gallery Types
  public type GalleryCategory = {
    #captainsAnnouncement;
    #ratanjee;
    #northernBrawl;
    #xpl;
  };

  module GalleryCategory {
    public func toText(category : GalleryCategory) : Text {
      switch (category) {
        case (#captainsAnnouncement) { "Captains Announcement" };
        case (#ratanjee) { "Ratanjee" };
        case (#northernBrawl) { "Northern Brawl" };
        case (#xpl) { "XPL" };
      };
    };
  };

  public type GalleryImage = {
    id : Text;
    category : GalleryCategory;
    blob : Storage.ExternalBlob;
    imageLabel : Text;
    orderIndex : Nat;
  };

  module GalleryImage {
    public func compareByOrderIndex(img1 : GalleryImage, img2 : GalleryImage) : Order.Order {
      if (img1.orderIndex < img2.orderIndex) { #less } else if (img1.orderIndex > img2.orderIndex) { #greater } else {
        #equal;
      };
    };
  };

  let images = Map.empty<Text, GalleryImage>();

  // Add new image (admin only)
  public shared ({ caller }) func addImage(image : GalleryImage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add images");
    };
    if (images.containsKey(image.id)) { Runtime.trap("Image with this id already exists") };
    images.add(image.id, image);
  };

  // Update existing image (admin only)
  public shared ({ caller }) func updateImage(image : GalleryImage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update images");
    };
    if (not images.containsKey(image.id)) { Runtime.trap("Image does not exist") };
    images.add(image.id, image);
  };

  // Delete image (admin only)
  public shared ({ caller }) func deleteImage(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete images");
    };
    if (not images.containsKey(id)) { Runtime.trap("Image does not exist") };
    images.remove(id);
  };

  // Get all images sorted by orderIndex (public read)
  public query ({ caller }) func getAllImages() : async [GalleryImage] {
    images.values().toArray().sort(GalleryImage.compareByOrderIndex);
  };

  // Get images by category sorted by orderIndex (public read)
  public query ({ caller }) func getImagesByCategory(category : GalleryCategory) : async [GalleryImage] {
    let filtered = List.empty<GalleryImage>();
    for (img in images.values()) {
      if (img.category == category) {
        filtered.add(img);
      };
    };
    filtered.toArray().sort(GalleryImage.compareByOrderIndex);
  };
};
