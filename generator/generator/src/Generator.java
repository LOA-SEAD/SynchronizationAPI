
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.FileVisitOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.EnumSet;

import com.github.javaparser.JavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.FieldDeclaration;
import com.github.javaparser.ast.body.VariableDeclarator;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;

public class Generator {
	 			
			
	private static String model;
	
	public static void main(String[] args) throws Exception {
		
		String modeloFileName = args[0];
		String outputDir = args[1];
		String microServiceDir = args[2]+"/microservico";
		String modelDir = args[2]+"/modelo";
		
		
		String param[] = modeloFileName.split("/");
		int i = param.length-1;
		String fileName = param[i];
		String name[] = fileName.split("\\.");
		
		//String str = "jogo";	
		String str = name[0].toLowerCase();
		
			String strUpper = str.substring(0, 1).toUpperCase() + str.substring(1);
		
			//File dir = new File(dirOut+"/src/br/ufscar/dc");
			File dir = new File(microServiceDir+"/template-ws/src/main/java/br/com/template");

	        FileInputStream file1 = new FileInputStream(modelDir+"/Controller.java");
	        CompilationUnit cu = getCompilationUnit(file1);
	        String result = cu.toString();

	        result = result.replaceAll("template", str);
	        result = result.replaceAll("Template", strUpper);
	        
	        
	        /*if (!dir.exists()) {
	        	dir.mkdirs();
	        }*/
	        
	        File dir_clear = new File(dir + "/controller");
	        for(File file_clear: dir_clear.listFiles()) 
	            file_clear.delete();
	        File file = new File(dir+"/controller",strUpper+"Controller.java");
	        
	        PrintWriter out = new PrintWriter(file); 
	        
	        out.println(result);
	        
	        out.close();
	                
	        file1 = new FileInputStream(modelDir+"/Dao.java");
	        cu = getCompilationUnit(file1);
	        result = cu.toString();
	        
	        result = result.replaceAll("template", str);
	        result = result.replaceAll("Template", strUpper);
	        
	        dir_clear = new File(dir + "/dao");
	        for(File file_clear: dir_clear.listFiles()) 
	            file_clear.delete();
	        
	        file = new File(dir+"/dao",strUpper+"DAO.java");
	        
	        out = new PrintWriter(file); 
	        
	        out.println(result);
	        
	        out.close();
	        
	        file1 = new FileInputStream(modelDir+"/Model.java");
	        cu = getCompilationUnit(file1);

	        model = cu.toString();
	        
	        //trabalha com model
	        //remover os espa�os do fim da string
	        model=model.trim();
	        //remover o �ltimo caracter '}'
	        model = model.substring (0, model.length() - 2);
	        
	        model = model.replaceAll("template", str);
	        model = model.replaceAll("Template", strUpper);
	        
	        //file1 = new FileInputStream("modelo.java");
	        file1 = new FileInputStream(modeloFileName);
	        cu = getCompilationUnit(file1);
	        
	        new VariableVisitor().visit(cu, null);
	        
	        //adicionando a chave '}' que foi removida
    		model += "\n }";
    		
    		dir_clear = new File(dir + "/model");
	        for(File file_clear: dir_clear.listFiles()) 
	            file_clear.delete();
	        
	        file = new File(dir+"/model",strUpper+".java");
	        
	        out = new PrintWriter(file); 
	        
	        out.println(model);
	        
	        out.close();
	        
	        file1 = new FileInputStream(modelDir+"/Application.java");
	        cu = getCompilationUnit(file1);
	        result = cu.toString();

	        result = result.replaceAll("template", str);
	        result = result.replaceAll("Template", strUpper);
	        
	        file = new File(dir,"Application.java");
	        
	        out = new PrintWriter(file); 
	        
	        out.println(result);
	        
	        out.close();
	        
	        /*file1 = new FileInputStream("pom.xml");
	        cu = getCompilationUnit(file1);
	        result = cu.toString();

	        result = result.replaceAll("template", str);
	        result = result.replaceAll("template", strUpper);
	        
	        file = new File(dir,"pom.xml");
	        
	        out = new PrintWriter(file); 
	        
	        out.close();*/
	               
	        Path source = Paths.get(microServiceDir);
	        Path target = Paths.get(outputDir);
	        Files.walkFileTree(source, EnumSet.of(FileVisitOption.FOLLOW_LINKS),
	            Integer.MAX_VALUE, new CopyDirectory(source, target));
	        
	        /*InvocationRequest request = new DefaultInvocationRequest();
	        request.setPomFile( new File( "/path/to/pom.xml" ) );
	        request.setGoals( Arrays.asList( "clean", "install" ) );

	        Invoker invoker = new DefaultInvoker();
	        invoker.execute( request );*/
	            
	    }

	    public static CompilationUnit getCompilationUnit(InputStream in) {
	        try {
	            CompilationUnit cu;
	            try {
	                // parse the file
	                cu = JavaParser.parse(in);
	                return cu;
	            } finally {
	                in.close();
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return null;
	    }	
	    
	    /**
	     * Simple visitor implementation for visiting MethodDeclaration nodes. 
	     */
	    private static class VariableVisitor extends VoidVisitorAdapter {	    	
	        @Override
	        public void visit(FieldDeclaration f, Object arg) {
	        	String attUpper;
			        String name;			        
			        for (VariableDeclarator v : f.getVariables()) {
		        		name = v.getId().getName();
		        		attUpper = name.substring(0, 1).toUpperCase() + name.substring(1);
		        		model += "\n @Column(name=\""+name+"\")";
		        		model += "\n private " + f.getType() + " " + name + ";";
		        		model += "\n public void set" + attUpper + "(" + f.getType() + " " + name + ") {\n this." + name + " = " + name + "; \n}";
		        		model += "\n public " + f.getType() + " get" + attUpper + "() {\n return " + name + "; \n}";		        		
		        	}			                			        	        	        
	            super.visit(f, arg);
	        }	               
	    }
}
