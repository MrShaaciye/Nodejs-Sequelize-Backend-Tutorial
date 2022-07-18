module.exports = (app) => {
	const UserCtrl = require(`../controllers/users.controller.jsx`);
	const PostCtrl = require(`../controllers/posts.controller.jsx`);
	const PostTagCtrl = require(`../controllers/postTags.controller.jsx`);
	const TagCtrl = require(`../controllers/tags.controller.jsx`);
	const EmployeeCtrl = require(`../controllers/employees.controller.jsx`);
	const ImageCtrl = require(`../controllers/images.controller.jsx`);
	const VideoCtrl = require(`../controllers/videos.controller.jsx`);
	const CommentCtrl = require(`../controllers/comments.controller.jsx`);
	const TagTaggableCtrl = require(`../controllers/tagsTaggable.controller.jsx`);
	const router = require(`express`).Router();

	// Router Users
	router.route(`/users/`).get(UserCtrl.findAll).post(UserCtrl.create);
	router.route(`/users/:id`).get(UserCtrl.findOne).put(UserCtrl.update).delete(UserCtrl.delete);
	router.route(`/usersRestore/:id`).get(UserCtrl.restore);

	// Router Posts
	router.route(`/posts/`).get(PostCtrl.findAll).post(PostCtrl.create);
	router.route(`/posts/:id`).get(PostCtrl.findOne).put(PostCtrl.update).delete(PostCtrl.delete);
	router.route(`/postsRestore/:id`).get(PostCtrl.restore);

	// Router Tags
	router.route(`/tags/`).get(TagCtrl.findAll).post(TagCtrl.create);
	router.route(`/tags/:id`).get(TagCtrl.findOne).put(TagCtrl.update).delete(TagCtrl.delete);
	router.route(`/tagsRestore/:id`).get(TagCtrl.restore);

	// Router PostTags
	router.route(`/posttags/`).get(PostTagCtrl.findAllPosts).post(PostTagCtrl.create);
	router.route(`/tagposts`).get(PostTagCtrl.findAllTags);
	router.route(`/posttags/:id`).get(PostTagCtrl.findOnePost).put(PostTagCtrl.update).delete(PostTagCtrl.delete);
	router.route(`/tagposts/:id`).get(PostTagCtrl.findOneTag);
	router.route(`/posttagsRestore/:id`).get(PostTagCtrl.restore);

	// Router Videos
	router.route(`/videos/`).get(VideoCtrl.findAll).post(VideoCtrl.create);
	router.route(`/videos/:id`).get(VideoCtrl.findOne).put(VideoCtrl.update).delete(VideoCtrl.delete);
	router.route(`/videosRestore/:id`).get(VideoCtrl.restore);

	// Router Images
	router.route(`/images/`).get(ImageCtrl.findAll).post(ImageCtrl.create);
	router.route(`/images/:id`).get(ImageCtrl.findOne).put(ImageCtrl.update).delete(ImageCtrl.delete);
	router.route(`/imagesRestore/:id`).get(ImageCtrl.restore);

	// Router Comments
	router.route(`/comments/`).get(CommentCtrl.findAll).post(CommentCtrl.create);
	router.route(`/comments/:id`).get(CommentCtrl.findOne).put(CommentCtrl.update).delete(CommentCtrl.delete);
	router.route(`/commentsRestore/:id`).get(CommentCtrl.restore);

	// Router Employees
	router.route(`/employees/`).get(EmployeeCtrl.findAll).post(EmployeeCtrl.create);
	router.route(`/employees/:id`).get(EmployeeCtrl.findOne).put(EmployeeCtrl.update).delete(EmployeeCtrl.delete);
	router.route(`/employeesRestore/:id`).get(EmployeeCtrl.restore);

	// Router TagTaggables
	router.route(`/tagtaggables/`).get(TagTaggableCtrl.findAll).post(TagTaggableCtrl.create);
	router.route(`/tagtaggables/:id`).get(TagTaggableCtrl.findOne).put(TagTaggableCtrl.update).delete(TagTaggableCtrl.delete);
	router.route(`/tagtaggablesRestore/:id`).get(TagTaggableCtrl.restore);

	app.use(`/api/v2.4`, router);
};
